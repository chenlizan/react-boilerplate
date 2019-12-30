import * as _ from 'lodash';
import * as moment from 'moment';


export function getTurnPoints(data: Array<any>): Array<any> {
    const taskTurnPointArr: Array<any> = [];
    for (let i = 0; i < data.length; i++) {
        taskTurnPointArr.push(new Date(data[i].startDate));
        const endDate = new Date(data[i].endDate);
        endDate.setDate(endDate.getDate() + 1);
        taskTurnPointArr.push(endDate);
    }
    return _.sortBy(_.uniqBy(taskTurnPointArr, function (o: Date) {
        return moment(o).format("YYYY-M-D");
    }));
}

export function getTaskInfo(data: Array<any>, taskInfo: object): object {
    return data[_.findIndex(data, taskInfo)];
}

export function getDiff(startDate: Date, currentDate: Date): number {
    return moment(currentDate).diff(startDate, 'days');
}