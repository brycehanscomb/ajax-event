import {
    DEFAULT_DATA,
    DEFAULT_ERROR,
    DEFAULT_MESSAGE
} from "./_defaults";

export enum AjaxEventStatus {
    Ready = 'READY',
    Executing = 'EXECUTING',
    Error = 'ERROR',
    Success = 'SUCCESS'
}

class AjaxEvent<DataT = any> {
    public status : AjaxEventStatus = AjaxEventStatus.Ready;
    public error : Error | string | null = DEFAULT_ERROR;
    public message : string = DEFAULT_MESSAGE;
    public data : DataT | undefined = DEFAULT_DATA;

    private resetTo(status : AjaxEventStatus, shouldClearData : boolean) : AjaxEvent<DataT> {
        const result = new AjaxEvent<DataT>();

        result.status = status;
        result.error = DEFAULT_ERROR;
        result.message = DEFAULT_MESSAGE;

        if (shouldClearData) {
            result.data = DEFAULT_DATA;
        } else {
            result.data = this.data;
        }

        return result;
    }

    resetToReady() : AjaxEvent<DataT> {
        return this.resetTo(AjaxEventStatus.Ready, true);
    }

    resetToExecuting(): AjaxEvent<DataT> {
        return this.resetTo(AjaxEventStatus.Executing, false);
    }

    resolve(data : DataT | undefined = DEFAULT_DATA, message : string = DEFAULT_MESSAGE) : AjaxEvent<DataT> {
        const result = new AjaxEvent<DataT>();

        result.status = AjaxEventStatus.Success;
        result.error = null;
        result.message = message;
        result.data = data;

        return result;
    }

    reject(error : Error | string = '', message : string = DEFAULT_MESSAGE) : AjaxEvent<DataT> {
        const result = new AjaxEvent<DataT>();

        result.status = AjaxEventStatus.Error;
        result.error = error;
        result.message = message;
        result.data = undefined;

        return result;
    }

    isSuccessful() : boolean {
        return this.status === AjaxEventStatus.Success;
    }

    isExecuting() : boolean {
        return this.status === AjaxEventStatus.Executing;
    }

    isNotExecuting() : boolean {
        return this.status !== AjaxEventStatus.Executing;
    }

    isReady() : boolean {
        return this.status === AjaxEventStatus.Ready;
    }

    isNotReady() : boolean {
        return this.status !== AjaxEventStatus.Ready;
    }

    hasError() : boolean {
        return this.error !== null;
    }

    hasData() : boolean {
        return this.data !== undefined;
    }

    hasMessage() : boolean {
        return this.message.length !== 0;
    }
}

export default AjaxEvent;