adapt-courseReset
===============

This extension introduces a new Adapt event ```course:reset```. Triggering the event will set the course _isComplete to false and also all of the children.

#####Installation

From your Adapt folder run:
```bash
$ adapt install courseReset 
```

#####Configuration

adapt-courseReset also supports auto-hooking into the assessment plugin. To turn this on add to ```config.json```

```js
{
    "_courseReset": {
        "onFail": true
    }
}
```

Doing this will cause the plugin to subscribe to ```assessment:complete``` events and reset the course when the learner fails.