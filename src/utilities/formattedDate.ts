import dayjs from "dayjs"

export const formatDate = (date:string) => {
    return date = dayjs(date).format('MMM/DD/YY')
  }

export const lastUpdateTag = (dateString:string) => {
    const today = dayjs()
    const date = dayjs(dateString, 'MM/DD/YYYY')
    const diffDays = today.diff(date, 'day')
    const diffWeeks = today.diff(date, 'week')
    const diffMonths = today.diff(date, 'month')
    const diffYears = today.diff(date, 'year')

     switch(true){
      case date.isSame(today, 'day'):
        return 'Today';
      case date.isSame(today.subtract(1, 'day'), 'day'):
        return 'Yesterday';
      case diffDays >=2 && diffDays <= 7:
        return `${diffDays} days ago`;
      case diffWeeks > 0 && diffWeeks < 5:
        return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
      case diffMonths > 0 && diffMonths < 12:
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
      case diffYears > 0:
        return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
      default:
        return formatDate(dateString)
     }
  }