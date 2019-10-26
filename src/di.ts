import 'reflect-metadata'

const classPoll: Function[] = []

export function injectable(_constructor: Function) {
    // get params by reflect
    const paramTypes: Function[] = Reflect.getMetadata('design:paramtypes', _constructor)
    if (paramTypes && paramTypes.length) {
        for (const paramType of paramTypes) {
            if (paramType === _constructor) {
                throw new Error(`${paramType.name} can not dependency itself `)
            }
            if (!classPoll.includes(paramType)) {
                throw new Error(`The dependency ${paramType.name} can't be inject`)
            }
        }
    }
    classPoll.push(_constructor)
}

export function create<T>(_constructor: new (...args: any[]) => T): T {
    const paramTypes: Function[] = Reflect.getMetadata('design:paramtypes', _constructor)
    const paramInstances = paramTypes.map(paramType => {
        if (!classPoll.includes(paramType)) {
            throw new Error(`The param ${paramType.name} can't be inject`)
        }

        if (paramType.length) {
            return create(paramType as any)
        } else {
            return new (paramType as any)()
        }
    })

    return new _constructor(...paramInstances)
}
