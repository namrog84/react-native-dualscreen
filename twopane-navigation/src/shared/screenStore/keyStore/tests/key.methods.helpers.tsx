import { IKeyAction, IKeyState, IKeyObject } from '../key.interface';
import { paneType } from '../../../../utilities/interfaces';
import { store } from '../../../../appStore';
import * as keyActions from '../key.actions';

export const KeyActionBuilder = (type: string, screen: paneType, key: string, isMerge: boolean): IKeyAction => {
    return {
        type: type,
        payload: {
            screen: screen,
            key: key,
            isMerge: isMerge
        }
    }
}
/**
 * mocks keyState building 3 objects for the final state
 */
//TODO: TURN INTO FOR LOOP AUTO INCREMENT FUNCTION 
export const mockKeyState = (screen: paneType, isMerge: boolean, prependKey: string = ''): IKeyState => {
    const first = keyObjectBuilder(`${prependKey}first`, isMerge, screen)
    const second = keyObjectBuilder(`${prependKey}second`, isMerge, screen)
    const third = keyObjectBuilder(`${prependKey}third`, isMerge, screen)
    return {
        keys: [first, second, third]
    }
}

export const keyObjectBuilder = (key: string, isMerge: boolean, screen: paneType): IKeyObject => {
    return {
        key: key,
        isMerge: isMerge,
        screen: screen
    }
}

export const populateKeyStore3 = (screen: paneType, isMerge: boolean) => {
    const keyState = mockKeyState(screen, isMerge);
    keyState.keys.map(val => store.dispatch(keyActions.pushKey(val.screen, val.key, val.isMerge)))
}