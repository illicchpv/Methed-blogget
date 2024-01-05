module.exports = {
  prompt: ({inquirer}) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'имя компонента',
      },
      {
        type: 'input',
        name: 'dir',
        message: 'вложенная директория?(optional)',
      },
    ]

    return inquirer.prompt(questions).then(aunswers => {
      const {component_name, dir} = aunswers
      const path = `${dir ? `${dir}/` : ''}${component_name}`
      const absPath = `src/components/${path}`
      return {...aunswers, path, absPath}
    })
  }
}