import { RejectValue } from './axiosTypes.ts';
import toast from 'react-hot-toast';

const handleRejectedThunk = (
  state: any,
  action: { payload: RejectValue | undefined },
  apiLink: string,
) => {
  if (action.payload) {
    state.api[apiLink].status = 'rejected';
    state.api[apiLink].statusCode = action.payload.statusCode;
    state.api[apiLink].error = action.payload.message;

    if (
      action.payload.statusCode !== 404 &&
      action.payload.statusCode !== 500
      && !action.payload.code
    ) {
      toast.error(action.payload.message);
    }
  }
};

export default handleRejectedThunk;
