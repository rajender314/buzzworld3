import { Subject } from 'rxjs';

const subject = new Subject();
const subject2 = new Subject();
const subject3 = new Subject();

export const SubscribeService = {
  sendMessage: (message: any) => subject.next({ data: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};
export const SubscribeService2 = {
  sendMessage2: (message: any) => subject2.next({ data: message }),
  clearMessages: () => subject2.next(),
  getMessage2: () => subject2.asObservable(),
};
export const UserPermissionsSubscribe = {
  sendData: (message: any) => subject3.next({ data: message }),
  clearData: () => subject3.next(),
  getData: () => subject3.asObservable(),
};
