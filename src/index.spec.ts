import {describe, it} from 'mocha';
import {expect} from 'chai';

import {DEFAULT_DATA, DEFAULT_ERROR, DEFAULT_MESSAGE} from "./_defaults";
import AjaxEvent, { AjaxEventStatus } from './index';

describe('AjaxEvent', () => {

    describe('#constructor', () => {

        const instance = new AjaxEvent();

        it('should initialize with the status set to ready', () => {
            expect(
                instance.status
            ).to.equal(
                AjaxEventStatus.Ready
            );
        });

        it('should initialize with no error', () => {
            expect(
                instance.error
            ).to.equal(
                DEFAULT_ERROR
            );
        });

        it('should initialize with no message', () => {
            expect(
                instance.message
            ).to.equal(
                DEFAULT_MESSAGE
            );
        });

        it('should initialize with no data', () => {
            expect(
                instance.data
            ).to.equal(
                DEFAULT_DATA
            );
        });

    });

    describe('action methods', () => {

        describe('#resetToReady', () => {

            // create an instance
            const instance = new AjaxEvent();

            // do some wacky stuff to it
            instance.message = String(Math.random());
            instance.status = AjaxEventStatus.Success;
            instance.data = Math.random();
            instance.error = new Error(String(Math.random()));

            // call the method
            const returnVal = instance.resetToReady();

            it('should change the status back to ready', () => {
                expect(
                    instance.status
                ).to.equal(
                    AjaxEventStatus.Ready
                );
            });

            it('should clear the error', () => {
                expect(
                    instance.error
                ).to.equal(
                    null
                );
            });

            it('should clear the message', () => {
                expect(
                    instance.message
                ).to.equal(
                    ''
                );
            });

            it('should clear the data', () => {
                expect(
                    instance.data
                ).to.equal(
                    undefined
                );
            });

            it('should return the same instance', () => {
                expect(
                    returnVal
                ).to.equal(
                    instance
                );
            });

        });

        describe('#resetToExecuting', () => {

            // create an instance
            const instance = new AjaxEvent();

            // do some wacky stuff to it
            instance.message = String(Math.random());
            instance.status = AjaxEventStatus.Success;
            instance.data = Math.random();
            instance.error = new Error(String(Math.random()));

            // call the method
            const returnVal = instance.resetToExecuting();

            it('should change the status to executing', () => {
                expect(
                    instance.status
                ).to.equal(
                    AjaxEventStatus.Executing
                );
            });

            it('should clear the error', () => {
                expect(
                    instance.error
                ).to.equal(
                    null
                );
            });

            it('should clear the message', () => {
                expect(
                    instance.message
                ).to.equal(
                    ''
                );
            });

            it('should clear the data', () => {
                expect(
                    instance.data
                ).to.equal(
                    undefined
                );
            });

            it('should return the same instance', () => {
                expect(
                    returnVal
                ).to.equal(
                    instance
                );
            });

        });

        describe('#resolve', () => {

            // create an instance
            const instance = new AjaxEvent();

            // do some wacky stuff to it
            instance.message = String(Math.random());
            instance.status = AjaxEventStatus.Ready;
            instance.data = Math.random();
            instance.error = new Error(String(Math.random()));

            // call the method
            const returnVal = instance.resolve();

            it('should change the status to success', () => {
                expect(
                    instance.status
                ).to.equal(
                    AjaxEventStatus.Success
                );
            });

            it('should clear the error', () => {
                expect(
                    instance.error
                ).to.equal(
                    null
                );
            });

            it('should clear the message if no message passed', () => {
                instance.resolve();

                expect(
                    instance.message
                ).to.equal(
                    ''
                );
            });

            it('should store the message if a message is passed', () => {
                const message = String(Math.random());
                instance.resolve(undefined, message);

                expect(
                    instance.message
                ).to.equal(
                    message
                );
            });

            it('should clear the data if no data passed', () => {
                instance.resolve();

                expect(
                    instance.data
                ).to.equal(
                    undefined
                );
            });

            it('should store the data if some data is passed', () => {
                const data = String(Math.random());
                instance.resolve(data);

                expect(
                    instance.data
                ).to.equal(
                    data
                );
            });

            it('should return the same instance', () => {
                expect(
                    returnVal
                ).to.equal(
                    instance
                );
            });

        });

        describe('#reject', () => {

            // create an instance
            const instance = new AjaxEvent();

            // do some wacky stuff to it
            instance.message = String(Math.random());
            instance.status = AjaxEventStatus.Ready;
            instance.data = Math.random();
            instance.error = new Error(String(Math.random()));

            // call the method
            const theError = new Error('What up');
            const returnVal = instance.reject(theError);

            it('should change the status to error', () => {
                expect(
                    instance.status
                ).to.equal(
                    AjaxEventStatus.Error
                );
            });

            it('should store the error', () => {
                expect(
                    instance.error
                ).to.equal(
                    theError
                );
            });

            it('should clear the message if no message passed', () => {
                instance.reject(theError);

                expect(
                    instance.message
                ).to.equal(
                    ''
                );
            });

            it('should store the message if a message is passed', () => {
                const message = String(Math.random());
                instance.reject(theError, message);

                expect(
                    instance.message
                ).to.equal(
                    message
                );
            });

            it('should clear the data', () => {
                instance.reject(theError);

                expect(
                    instance.data
                ).to.equal(
                    undefined
                );
            });

            it('should return the same instance', () => {
                expect(
                    returnVal
                ).to.equal(
                    instance
                );
            });

        });

    });

    describe('introspection methods', () => {

        describe('#isSuccessful', () => {

            it('should return true when the instance has been resolved', () => {
                const instance = new AjaxEvent();
                instance.resolve();

                expect(
                    instance.isSuccessful()
                ).to.equal(
                    true
                );
            });

            it('should return false if the instance has not done anything yet', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.isSuccessful()
                ).to.equal(
                    false
                );
            });

            it('should return false if the instance is currently executing', () => {
                const instance = new AjaxEvent();
                instance.resetToExecuting();

                expect(
                    instance.isSuccessful()
                ).to.equal(
                    false
                );
            });

            it('should return false if the instance has errored', () => {
                const instance = new AjaxEvent();
                instance.reject(new Error('oh no!'));

                expect(
                    instance.isSuccessful()
                ).to.equal(
                    false
                );
            });
        });

        describe('#isExecuting', () => {

            it('should return false when the instance has been resolved', () => {
                const instance = new AjaxEvent();
                instance.resolve();

                expect(
                    instance.isExecuting()
                ).to.equal(
                    false
                );
            });

            it('should return false if the instance has not done anything yet', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.isExecuting()
                ).to.equal(
                    false
                );
            });

            it('should return true if the instance is currently executing', () => {
                const instance = new AjaxEvent();
                instance.resetToExecuting();

                expect(
                    instance.isExecuting()
                ).to.equal(
                    true
                );
            });

            it('should return false if the instance has errored', () => {
                const instance = new AjaxEvent();
                instance.reject(new Error('oh no!'));

                expect(
                    instance.isExecuting()
                ).to.equal(
                    false
                );
            });
        });

        describe('#isNotExecuting', () => {

            it('should return true when the instance has been resolved', () => {
                const instance = new AjaxEvent();
                instance.resolve();

                expect(
                    instance.isNotExecuting()
                ).to.equal(
                    true
                );
            });

            it('should return true if the instance has not done anything yet', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.isNotExecuting()
                ).to.equal(
                    true
                );
            });

            it('should return false if the instance is currently executing', () => {
                const instance = new AjaxEvent();
                instance.resetToExecuting();

                expect(
                    instance.isNotExecuting()
                ).to.equal(
                    false
                );
            });

            it('should return true if the instance has errored', () => {
                const instance = new AjaxEvent();
                instance.reject(new Error('oh no!'));

                expect(
                    instance.isNotExecuting()
                ).to.equal(
                    true
                );
            });
        });

        describe('#isReady', () => {

            it('should return false when the instance has been resolved', () => {
                const instance = new AjaxEvent();
                instance.resolve();

                expect(
                    instance.isReady()
                ).to.equal(
                    false
                );
            });

            it('should return true if the instance has not done anything yet', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.isReady()
                ).to.equal(
                    true
                );
            });

            it('should return false if the instance is currently executing', () => {
                const instance = new AjaxEvent();
                instance.resetToExecuting();

                expect(
                    instance.isReady()
                ).to.equal(
                    false
                );
            });

            it('should return false if the instance has errored', () => {
                const instance = new AjaxEvent();
                instance.reject(new Error('oh no!'));

                expect(
                    instance.isReady()
                ).to.equal(
                    false
                );
            });
        });

        describe('#isNotReady', () => {

            it('should return true when the instance has been resolved', () => {
                const instance = new AjaxEvent();
                instance.resolve();

                expect(
                    instance.isNotReady()
                ).to.equal(
                    true
                );
            });

            it('should return false if the instance has not done anything yet', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.isNotReady()
                ).to.equal(
                    false
                );
            });

            it('should return true if the instance is currently executing', () => {
                const instance = new AjaxEvent();
                instance.resetToExecuting();

                expect(
                    instance.isNotReady()
                ).to.equal(
                    true
                );
            });

            it('should return true if the instance has errored', () => {
                const instance = new AjaxEvent();
                instance.reject(new Error('oh no!'));

                expect(
                    instance.isNotReady()
                ).to.equal(
                    true
                );
            });
        });

        describe('#hasError', () => {

            it('should return false when there is no error', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.hasError()
                ).to.equal(
                    false
                );

                instance.resetToExecuting();

                expect(
                    instance.hasError()
                ).to.equal(
                    false
                );

                instance.resolve(5);

                expect(
                    instance.hasError()
                ).to.equal(
                    false
                );

            });

            it('should return true when there is an error', () => {
                const instance = new AjaxEvent();
                instance.reject(new Error('What!'));

                expect(
                    instance.hasError()
                ).to.equal(
                    true
                );

            });

        });

        describe('#hasData', () => {

            it('should return false when there is no data', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.hasData()
                ).to.equal(
                    false
                );

                instance.resetToExecuting();

                expect(
                    instance.hasData()
                ).to.equal(
                    false
                );

                instance.reject(new Error('Dang!'));

                expect(
                    instance.hasData()
                ).to.equal(
                    false
                );

            });

            it('should return true when there is data set', () => {
                const instance = new AjaxEvent();
                instance.resolve('Hello!');

                expect(
                    instance.hasData()
                ).to.equal(
                    true
                );

            });

        });

        describe('#hasMessage', () => {

            it('should return false when there is no message', () => {
                const instance = new AjaxEvent();

                expect(
                    instance.hasMessage()
                ).to.equal(
                    false
                );

                instance.resetToExecuting();

                expect(
                    instance.hasMessage()
                ).to.equal(
                    false
                );

                instance.reject(new Error('Dang!'));

                expect(
                    instance.hasMessage()
                ).to.equal(
                    false
                );

                instance.resolve('What up!');

                expect(
                    instance.hasMessage()
                ).to.equal(
                    false
                );

            });

            it('should return true when there is data set', () => {
                const instance = new AjaxEvent();

                instance.resolve('Hello!', 'Some message');

                expect(
                    instance.hasMessage()
                ).to.equal(
                    true
                );

                instance.reject(new Error('Oh no!'), 'Some message');

                expect(
                    instance.hasMessage()
                ).to.equal(
                    true
                );

            });

        });

    });

});