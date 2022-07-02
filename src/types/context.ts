import { Member } from './member';

interface Message {
    new_chat_members: Member[];
}

export type Context = {
    message: Message;
};
