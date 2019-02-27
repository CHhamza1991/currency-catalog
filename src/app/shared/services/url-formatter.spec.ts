/* Services */
import { UrlFormatter } from './url-formatter';

describe('UrlFormatter', () => {

    let urlFormatter;

    beforeEach(() => {
        urlFormatter = new UrlFormatter();
    });

    it('Should format url with one value', () => {
        /* Given */
        const url = 'foo/{}';
        const value = 123;

        /* when */
        const result = urlFormatter.format(url, value);

        /* Then */
        expect(result).toBe('foo/123');
    });

    it('Should format url with values', () => {
        /* Given */
        const url = 'foo/{}/bar/{}/';
        const values = [123, 'hello'];

        /* when */
        const result = urlFormatter.format(url, values[0], values[1]);

        /* Then */
        expect(result).toBe('foo/123/bar/hello/');
    });

    it('Should not format url when no token are set', () => {
        /* Given */
        const url = 'foo/bar';
        const values = [123, 'hello'];

        /* when */
        const result = urlFormatter.format(url, values[0], values[1]);

        /* Then */
        expect(result).toBe('foo/bar');
    });

});
