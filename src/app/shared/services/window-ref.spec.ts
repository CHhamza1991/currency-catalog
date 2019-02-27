/* Services */
import { WindowRef } from './window-ref';

describe('WindowRef', () => {

    let windowRef;

    beforeEach(() => {
        windowRef = new WindowRef();
    });

    it('Should return _window()', () => {
        /* Given */
        function _windowMock(): string {
            return 'hamza';
        }
        const spy = spyOn(windowRef, '_window').and.returnValue(_windowMock());

        /* when */
        const result = windowRef.nativeWindow;

        /* Then */
        expect(result).toBe('hamza');
    });

});
