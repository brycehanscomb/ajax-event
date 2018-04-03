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

class AjaxEvent {
    public status : AjaxEventStatus = AjaxEventStatus.Ready;
    public error : Error | null = DEFAULT_ERROR;
    public message : string = DEFAULT_MESSAGE;
    public data : any = DEFAULT_DATA;

    private resetTo(status : AjaxEventStatus) : void {
        this.status = status;
        this.error = DEFAULT_ERROR;
        this.message = DEFAULT_MESSAGE;
        this.data = DEFAULT_DATA;
    }

    resetToReady() : AjaxEvent {
        this.resetTo(AjaxEventStatus.Ready);
        return this;
    }

    resetToExecuting(): AjaxEvent {
        this.resetTo(AjaxEventStatus.Executing);
        return this;
    }

    resolve(data : any = DEFAULT_DATA, message : string = DEFAULT_MESSAGE) : AjaxEvent {
        this.status = AjaxEventStatus.Success;
        this.error = null;
        this.message = message;
        this.data = data;

        return this;
    }

    reject(error : Error, message : string = DEFAULT_MESSAGE) : AjaxEvent {
        this.status = AjaxEventStatus.Error;
        this.error = error;
        this.message = message;
        this.data = undefined;

        return this;
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