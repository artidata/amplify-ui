import {
  ModelInit,
  PersistentModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_UPDATE_FINISHED,
  ACTION_DATASTORE_UPDATE_STARTED,
  DATASTORE_QUERY_BY_ID_ERROR,
  EVENT_ACTION_DATASTORE_UPDATE,
  UI_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';

export interface UseDataStoreUpdateActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  id: string;
  fields: ModelInit<Model, { readOnlyFields: 'createdAt' | 'updatedAt' }>;
}

/**
 * Action to Update DataStore item
 * @internal
 */
export const useDataStoreUpdateAction =
  <Model extends PersistentModel>({
    model,
    id,
    fields,
  }: UseDataStoreUpdateActionOptions<Model>) =>
  async () => {
    try {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_UPDATE_STARTED,
          data: { fields, id },
        },
        EVENT_ACTION_DATASTORE_UPDATE,
        AMPLIFY_SYMBOL
      );

      const original = await DataStore.query(model, id);
      // If query by id doesn't return an item,
      // original will be undefined
      // so we'll log a helpful message.
      if (!original) {
        throw new Error(`${DATASTORE_QUERY_BY_ID_ERROR}: ${id}`);
      }

      const item = await DataStore.save(
        model.copyOf(original, (updated: any) => {
          Object.assign(updated, fields);
        })
      );

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_UPDATE_FINISHED,
          data: { fields, id, item },
        },
        EVENT_ACTION_DATASTORE_UPDATE,
        AMPLIFY_SYMBOL
      );
    } catch (error) {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_UPDATE_FINISHED,
          data: { fields, id, errorMessage: getErrorMessage(error) },
        },
        EVENT_ACTION_DATASTORE_UPDATE,
        AMPLIFY_SYMBOL
      );
    }
  };
