export function getStatusClassName(value: string) {
  console.log(value);
  switch (value) {
    case 'Open': {
      return 'open';
    }
    case 'Pending Approval' || 'Pending Approval - $10k': {
      return 'inprogress';
    }
    case 'Pending Approval - $10k': {
      return 'inprogress';
    }
    case 'Pending Approval - $25k': {
      return 'inprogress';
    }
    case 'Pending Approval - $50k': {
      return 'inprogress';
    }
    case 'Approved - $10k': {
      return 'approved';
    }
    case 'Approved - $25k': {
      return 'approved';
    }
    case 'Approved - $50k': {
      return 'approved';
    }
    case 'Approved': {
      return 'approved';
    }
    case 'Rejected': {
      return 'rejected';
    }
    case 'Lost': {
      return 'rejected';
    }
    case 'Closed': {
      return 'closed';
    }
    case 'Check In Pending': {
      return 'inprogress';
    }
    case 'checkedin': {
      return 'success';
    }
    case 'Confirmed': {
      return 'success';
    }
    case 'Checked-in': {
      return 'success';
    }
    case 'Won': {
      return 'success';
    }
    case 'Repairable': {
      return 'success';
    }
    case 'Non-Repairable': {
      return 'removed';
    }
    case 'Repairable - Outsource': {
      return 'moved';
    }
    case 'evaluation': {
      return 'success';
    }
    case 'Added to Quote': {
      return 'success';
    }
    case 'Partially Received': {
      return 'Partially';
    }
    case 'Requested': {
      return 'requested ';
    }
    case 'Ordered': {
      return 'Ordered ';
    }
    case 'Cancelled': {
      return 'closed ';
    }
    case 'Received and Completed': {
      return 'success ';
    }
    case 'In Progress': {
      return 'inprogress ';
    }
    case 'Pending QC': {
      return 'inprogress ';
    }
    case 'Active': {
      return 'success ';
    }
    case 'Pass': {
      return 'success ';
    }
    case 'Receiving': {
      return 'inprogress';
    }
    case 'Scrap': {
      return 'scrap';
    }
    case 'Recycle': {
      return 'recycle';
    }
    case 'Return': {
      return 'return';
    }
    case 'Outsource': {
      return 'outsource';
    }
    case 'Outsource Receiving': {
      return 'outsource';
    }
    case 'Outsource Repair': {
      return 'outsource';
    }
    case 'Outsource Shipping': {
      return 'outsource';
    }
    case 'Completed': {
      return 'completed';
    }
    case 'Pending Quote': {
      return 'inprogress';
    }
    case 'Pending Evaluation': {
      return 'inprogress';
    }
    case 'Pending Invoice': {
      return 'inprogress';
    }
    default: {
      return 'open';
    }
  }
}

export const RFQTimeList = ['9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00'];
