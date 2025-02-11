import { RejectValue } from './axiosTypes.ts';
import toast from 'react-hot-toast';

const handleRejectedThunk = (
  state: any,
  action: { payload: RejectValue | undefined },
  apiLink: string,
) => {
  if (action.payload) {
    state.api[apiLink].statusCode = action.payload.statusCode;
    state.api[apiLink].error = action.payload.message;
    state.data = null;

    if (
      action.payload.statusCode !== 404 &&
      action.payload.statusCode !== 500
    ) {
      toast.error(
        `Error: ${action.payload.status} - ${action.payload.message}`,
      );
    }
  }
};

export default handleRejectedThunk;
