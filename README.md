## Webkritzler

A simple web API for driving Alex Webers "Kritzler"

Currently not much more than a proof of concept.

For more info, go to [the Kritzler githubs](https://github.com/tinkerlog/Kritzler)

Thanks to Alex for building this and the [Makerhub](http://makerhub.de) for letting me play with it.

## Future Ideas

* Batching. POST /batch would accept a plaintext body with one command per line to keep things simple. The API needs to do proper throttling (not sending more commands if no OK comes back)
* Access control. I'm currently thinking about being able to obtain some sort of write lock (obtaining a token that you have to attach to the subsequent requests), so that only one user can kritzel at a time and releasing that write lock after a liberal amount of time or explicitly.

## Why node?

Hipsters. And npm. That's why. (Actually, it lends itself very well to these kind of IO plugging things)

