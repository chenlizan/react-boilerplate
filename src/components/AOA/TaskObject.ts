type TaskLogic = 'FS' | 'SF' | 'SS' | 'FF';

export interface TaskDataProps {
    taskName: string //任务名称
    taskNo?: number //任务编号
    taskLogic: TaskLogic //任务逻辑
    startDate?: Date //任务开始时间
    endDate?: Date //任务结束时间
    preTask?: Array<number> //前置任务
    posTask?: Array<number> //后置任务
    // taskType?: '关键工作' | '非关键工作' | '虚工作' | '自由时差'
    top?: number
}

export default class TaskObject<TaskDataProps> {

    private _taskName: string | undefined;
    private _taskNo: number | undefined;
    private _taskLogic: TaskLogic = 'FS';
    private _startDate: Date | undefined;
    private _endDate: Date | undefined;
    private _preTask: Array<number> = [];
    private _posTask: Array<number> = [];

    getTaskName(): string {
        return <string>this._taskName;
    }

    setTaskName(value: string): void {
        this._taskName = value;
    }

    getTaskNo(): number {
        return <number>this._taskNo;
    }

    setTaskNo(value: number): void {
        this._taskNo = value;
    }

    getTaskLogic(): TaskLogic {
        return <TaskLogic>this._taskLogic;
    }

    setTaskLogic(value: TaskLogic): void {
        this._taskLogic = value;
    }

    getStartDate(): Date {
        return <Date>this._startDate;
    }

    setStartDate(value: Date): void {
        this._startDate = value;
    }

    getEndDate(): Date {
        return <Date>this._endDate;
    }

    setEndDate(value: Date): void {
        this._endDate = value;
    }

    getPreTask(): Array<number> {
        return this._preTask;
    }

    setPreTask(value: Array<number>): void {
        this._preTask = value;
    }

    getPosTask(): Array<number> {
        return this._posTask;
    }

    setPosTask(value: Array<number>): void {
        this._posTask = value;
    }
}