'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const PropertyMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  { ssr: false }
)

export default function PropertyMapClient(props) {
  const memoProps = useMemo(() => props, [props.lat, props.lng, props.title, props.area])

  return <PropertyMap {...memoProps} />
}
