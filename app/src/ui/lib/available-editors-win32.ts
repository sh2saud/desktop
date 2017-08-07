import * as path from 'path'
import * as Registry from 'winreg'

export function findAtomExecutable(): Promise<string> {
  return new Promise((resolve, reject) => {
    const regKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\atom',
    })

    regKey.values((err, items) => {
      if (err) {
        reject(err)
        return
      }

      let displayName = ''
      let publisher = ''
      let installLocation = ''

      for (const item of items) {
        if (item.name === 'DisplayName') {
          displayName = item.value
        } else if (item.name === 'Publisher') {
          publisher = item.value
        } else if (item.name === 'InstallLocation') {
          installLocation = item.value
        }
      }

      if (displayName === 'Atom' && publisher === 'GitHub Inc.') {
        resolve(path.join(installLocation, 'bin', 'atom.cmd'))
        return
      }

      console.debug('Registry entry does not match expected settings for Atom')
      resolve('')
    })
  })
}

export function findCodeExecutable(): Promise<string> {
  return new Promise((resolve, reject) => {
    const regKey = new Registry({
      hive: Registry.HKLM,
      key:
        '\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{F8A2A208-72B3-4D61-95FC-8A65D340689B}_is1',
    })

    regKey.values((err, items) => {
      if (err) {
        reject(err)
        return
      }

      let displayName = ''
      let publisher = ''
      let installLocation = ''

      for (const item of items) {
        if (item.name === 'Inno Setup: Icon Group') {
          displayName = item.value
        } else if (item.name === 'Publisher') {
          publisher = item.value
        } else if (item.name === 'Inno Setup: App Path') {
          installLocation = item.value
        }
      }

      if (
        displayName === 'Visual Studio Code' &&
        publisher === 'Microsoft Corporation'
      ) {
        resolve(path.join(installLocation, 'bin', 'code.cmd'))
        return
      }

      console.debug('Registry entry does not match expected settings for Atom')
      resolve('')
    })
  })
}

export function findSublimeTextExecutable(): Promise<string> {
  return new Promise((resolve, reject) => {
    const regKey = new Registry({
      hive: Registry.HKLM,
      key:
        '\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Sublime Text 3_is1',
    })

    regKey.values((err, items) => {
      if (err) {
        reject(err)
        return
      }

      let displayName = ''
      let publisher = ''
      let installLocation = ''

      for (const item of items) {
        if (item.name === 'Inno Setup: Icon Group') {
          displayName = item.value
        } else if (item.name === 'Publisher') {
          publisher = item.value
        } else if (item.name === 'Inno Setup: App Path') {
          installLocation = item.value
        }
      }

      if (
        displayName === 'Sublime Text' &&
        publisher === 'Sublime HQ Pty Ltd'
      ) {
        resolve(path.join(installLocation, 'sublime_text.exe'))
        return
      }

      console.debug(
        'Registry entry does not match expected settings for Sublime Text'
      )
      resolve('')
    })
  })
}
