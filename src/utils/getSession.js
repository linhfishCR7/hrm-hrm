import Pool from './UserPool'

const GetSession = async () => {
  return await new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser()
    if (user) {
      user.getSession(async (err, session) => {
        if (err) {
          reject()
        } else {
          const attributes = await new Promise((resolve, reject) => {
            user.getUserAttributes((err, attributes) => {
              if (err) {
                reject(err)
              } else {
                const results = {}

                for (let attribute of attributes) {
                  const { Name, Value } = attribute
                  results[Name] = Value
                }

                resolve(results)
              }
            })
          })

          resolve({
            user,
            ...session,
            ...attributes,
          })
        }
      })
    } else {
      reject()
    }
  })
}
export default GetSession
