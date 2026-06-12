'use client'
import { lazy } from 'react'
import type { ComponentName } from '@/types/curriculum'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LazyComp = React.LazyExoticComponent<React.ComponentType<any>>

export const INTERACTIVE_COMPONENTS: Record<ComponentName, LazyComp> = {
  FractionCutter:  lazy(() => import('./FractionCutter')),
  ShapeMeasure:    lazy(() => import('./ShapeMeasure')),
  ClockDrag:       lazy(() => import('./ClockDrag')),
  AngleDrag:       lazy(() => import('./AngleDrag')),
  BalanceDrag:     lazy(() => import('./BalanceDrag')),
  PlaceValueDrag:  lazy(() => import('./PlaceValueDrag')),
  MoneyDrag:       lazy(() => import('./MoneyDrag')),
  BarChartDrag:    lazy(() => import('./BarChartDrag')),
  CubeBuilder:     lazy(() => import('./CubeBuilder')),
  NumberLine:      lazy(() => import('./NumberLine')),
  TextVis:         lazy(() => import('./TextVis')),
}
