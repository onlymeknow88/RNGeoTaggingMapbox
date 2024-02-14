import React, { useState } from 'react'

import { Button } from 'react-native'
import {DatePicker as DatePickerRN} from 'react-native-date-picker'

const DetePicker =() => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePickerRN
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default DetePicker