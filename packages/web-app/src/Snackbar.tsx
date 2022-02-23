import { createContainer } from 'unstated-next'

import {
  useState,
  useEffect,
  useCallback,
} from 'react'
import { Snackbar } from '@mui/material'

export const useSnackbar = () => {
  const [snackPack, setSnackPack] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState()

  const setMessage = useCallback((message) => {
    setSnackPack((prev) => [
      ...prev, {
        message,
        key: new Date().getTime(),
      },
    ])
  }, [])

  const close = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }, [])

  const onExited = useCallback(() => {
    setMessageInfo(undefined)
  }, [])

  return {
    setMessage,
    close,
    snackPack,
    onExited,
    isOpen,
    messageInfo,
    setMessageInfo,
    setSnackPack,
    setOpen,
  }
}

export const SnackbarStore = createContainer(useSnackbar)

const SnackbarContainer = () => {
  const {
    messageInfo,
    isOpen,
    close,
    onExited,
    snackPack,
    setMessageInfo,
    setSnackPack,
    setOpen,
  } = SnackbarStore.useContainer()

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && isOpen) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, isOpen])

  return (
    <Snackbar
      ContentProps={{
        sx: {
          fontWeight: 'bold',
        },
      }}
      key={messageInfo ? messageInfo.key : undefined}
      message={messageInfo ? messageInfo.message : undefined}
      open={isOpen}
      autoHideDuration={4000}
      TransitionProps={{ onExited }}
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    />
  )
}

export const SnackbarProvider = ({ children }) => {
  return (
    <SnackbarStore.Provider>
      {children}
      <SnackbarContainer />
    </SnackbarStore.Provider>
  )
}
