/* global Meteor, Tracker */
const handles = [];
const readyComputations = [];
const changeComputations = [];

function createSubscription(store, type, subscribe, get, onChange) {
  const handle = subscribe();
  const subscriptionId = handle.subscriptionId;
  handles[type] = handle;

  readyComputations[subscriptionId] = Tracker.autorun(() => {
    if (Tracker.currentComputation.stopped) {
      return;
    }

    const ready = handles[type].ready();

    store.dispatch({
      type: `${type}_READY`,
      ready,
    });
  });

  changeComputations[subscriptionId] = Tracker.autorun(() => {
    if (Tracker.currentComputation.stopped) {
      return;
    }

    const data = get();

    if (onChange) {
      onChange(data);
    }

    store.dispatch({
      type: `${type}_CHANGED`,
      data,
    });
  });
}

/* This middleware is used for Meteor subscriptions. It'll handle actions
 * containing a meteor object such as:
 *
 * const MY_SUBSCRIPTION = 'MY_SUBSCRIPTION';
 *
 * export function myAction (param1, param2) {
 *    return dispatch => {
 *      dispatch(myOnLoadingAction());
 *
 *      return {
 *        type: MY_SUBSCRIPTION,
 *        meteor: {
 *          subscribe: () => Meteor.subscribe('mysubscription', param1, param2),
 *          get: () => MyCollection.find(),
 *        }
 *      }
 *    }
 * }
 *
 * If you dispatch the same action more than one time with the same type, it will
 * stop and reload the subscription.
 *
 * It will dispatch an 'MY_SUBSCRIPTION_READY' action whenever the subscription.ready recompute.
 * The action will have a 'ready' property.
 *
 * It will dispatch an 'MY_SUBSCRIPTION_CHANGED' action when the subscription data change.
 * The action will have a 'data' property containing whatever your 'get' function returns.
 */
export default function(store) {
  return next => action => {
    if (!action.meteor || !action.meteor.subscribe) {
      return next(action);
    }

    const { subscribe, get, onChange } = action.meteor;

    // If we already have an handle for this action
    if (handles[action.type]) {
      const subscriptionId = handles[action.type].subscriptionId;
      changeComputations[subscriptionId].stop();
      readyComputations[subscriptionId].stop();
      handles[action.type].stop();
    }

    createSubscription(store, action.type, subscribe, get, onChange);
  };
}
