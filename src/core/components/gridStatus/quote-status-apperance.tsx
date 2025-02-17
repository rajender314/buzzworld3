import { getStatusClassName } from '@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers';
import { QuoteActivityPill } from './gridStatus.component';

export default function QuoteStatusAppearance(props: string) {
  // console.log(props)
  //  const { data } = props

  //  useEffect(() => {
  //    console.log(props)
  //  }, [])
  // function getStatusClassName(value: string) {
  //  switch (value) {
  //    case 'Open': {
  //      return 'open'
  //    }
  //    case 'Pending Approval': {
  //      return 'pending_approval'
  //    }
  //    case 'Approved': {
  //      return 'approved'
  //    }
  //    case 'Rejected': {
  //      return 'rejected'
  //    }
  //    case 'Closed': {
  //      return 'closed'
  //    }
  //    case 'Check In Pending': {
  //      return 'inprogress'
  //    }
  //    case 'checkedin': {
  //      return 'success'
  //    }
  //    case 'repairable': {
  //      return 'success'
  //    }
  //    case 'non_repairable': {
  //      return 'removed'
  //    }
  //    case 'outsource': {
  //      return 'moved'
  //    }
  //    case 'evaluation': {
  //      return 'success'
  //    }
  //    default: {
  //      return 'open'
  //    }
  //  }
  // }

  return (
    <QuoteActivityPill className={getStatusClassName(props)}>
      {props}
    </QuoteActivityPill>
  );
}
