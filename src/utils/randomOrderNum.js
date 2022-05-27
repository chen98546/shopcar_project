import {
    nanoid
} from 'nanoid'

export function randomOrderNum() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let random = nanoid();
    let order_id = `${year}${month}${day}${hour}${minute}${random}`
    return order_id;
}