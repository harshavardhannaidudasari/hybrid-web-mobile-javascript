const { expect } = require('chai');
const iosSampleScreen = require('../../pages/mobile/ios-sample.screen');

describe('iOS BStackSampleApp text echo', () => {
    it('echoes submitted text back in the output field', async () => {
        await iosSampleScreen.revealInput();
        await iosSampleScreen.submitText('hello@browserstack.com');

        const output = await iosSampleScreen.getOutputText();
        expect(output).to.equal('hello@browserstack.com');
    });
});
