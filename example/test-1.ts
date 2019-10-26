import { create, injectable } from '../src/di'

@injectable
class B {
    public thisIsB() {
        console.log('thisIsB')
    }
}

@injectable
class C {
    constructor(public b: B) {}
    public thisIsC() {
        console.log('thisIsC')
    }
}

@injectable
class A {
    constructor(public b: B, public c: C) {}
}

@injectable
class E {
    constructor(public b: B, public c: C) {}
}

const a = create(A)
const e = create(E)

a.b.thisIsB()
a.c.thisIsC()
e.c.b.thisIsB()
