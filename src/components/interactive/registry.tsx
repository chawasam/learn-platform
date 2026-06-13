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
  PizzaCutter:     lazy(() => import('./PizzaCutter')),
  FractionBars:    lazy(() => import('./FractionBars')),
  ThaiNumberBuilder: lazy(() => import('./ThaiNumberBuilder')),
  AddSubCarry:     lazy(() => import('./AddSubCarry')),
  ShapeExplorer:   lazy(() => import('./ShapeExplorer')),
  MultiplyArray:   lazy(() => import('./MultiplyArray')),
  DivideShare:     lazy(() => import('./DivideShare')),
  AreaTiles:       lazy(() => import('./AreaTiles')),
  OrderMachine:    lazy(() => import('./OrderMachine')),
  ParallelLines:   lazy(() => import('./ParallelLines')),
  ProbabilityBag:  lazy(() => import('./ProbabilityBag')),
  QuadMorph:       lazy(() => import('./QuadMorph')),
  TriangleAngles:  lazy(() => import('./TriangleAngles')),
  CircleRadius:    lazy(() => import('./CircleRadius')),
  FactorBuilder:   lazy(() => import('./FactorBuilder')),
  EquationBalance: lazy(() => import('./EquationBalance')),
  PercentBar:      lazy(() => import('./PercentBar')),
  TransversalAngles: lazy(() => import('./TransversalAngles')),
}
