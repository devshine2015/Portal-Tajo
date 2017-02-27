# portal-tajo

Drvr portal, the Second version

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![version](https://img.shields.io/badge/version-6.10.0-blue.svg)](http://drvr.co/)
---
## Naming Convention

* Lets prefix all the Immutable objects (Maps, Lists, etc) with __im__

_Example:_

```javascript
  const imProcessedList = getProcessedVehicles(getState());
  ....
  const imVehicle = currentIt.value;
```

---
## Production Deploy Workflow

For the deployment to the production, the sequence should be:

master -> *stage@candidate* -> |**QA/VERIFICATION**| -> *stage@true_candidate* -> |**wait for the release date**| -> *production*

NOTE: normally, no changes should be done directly to any of those *transitional branches*. Exception might be some hot fix, done directly in production branch.
In this case - make sure to apply the same fix to master.

To enforce this - use merge ours strategy; when deploying new version, we want to discard any changes made to *transitional branches* directly.

Something like this:

```
git checkout master
git merge -s ours stage@candidate
git checkout stage@candidate
git merge master
```


## Stage

* stage - playground to work with "real" data
* stage@candidate - release candidate, this needs to be tested (QA)
* stage@true_candidate - this is already tested/approved. It waits here for the release date - to be pushed to production

