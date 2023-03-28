import React, { FC, useState } from 'react'
import './App.css'

interface Param {
  id: number
  name: string
  type?: string
}

interface ParamValue {
  paramId: number
  value: string
}

interface Model {
  paramValue: ParamValue[]
}

interface Props {
  params?: Param[]
  model?: Model
}

const defaultParams: Param[] = [
  {
    id: 1,
    name: 'Назначение',
  },
  {
    id: 2,
    name: 'Длина',
  },
]

const defaultModel: Model = {
  paramValue: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
}

const App: FC<Props> = ({ params = defaultParams, model = defaultModel }) => {
  const [values, setValues] = useState<Array<ParamValue>>([
    ...defaultModel.paramValue,
  ])

  const getModel = (): Model => ({
    paramValue: values,
  })

  const hanleChangeParamsValue = (word: string, id: number) => {
    setValues((prev) => {
      const index = values.findIndex((item) => item.paramId === id)
      const newArr = [...prev]
      newArr[index] = {
        paramId: id,
        value: word,
      }
      return newArr
    })
  }

  return (
    <div className="App">
      {params &&
        params.map((param: Param) => {
          const paramsValue = values.find(
            (value) => value.paramId === param.id
          )?.value
          return (
            <div className="wrapper" key={param.id}>
              <span className="span">{param.name}</span>
              <input
                type="string"
                value={paramsValue}
                onChange={(e) =>
                  hanleChangeParamsValue(e.target.value, param.id)
                }
              />
            </div>
          )
        })}
      <button onClick={() => console.log(getModel())}>
        Вывод данных в консоль
      </button>
    </div>
  )
}

export default App
