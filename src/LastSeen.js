import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }) {
  return (
    <a><ReactTimeAgo date={date} locale="en-US"/></a>
  )
}