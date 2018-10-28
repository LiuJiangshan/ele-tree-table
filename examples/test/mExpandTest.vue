<template>
  <div>
    <m-expand :value="false" :loading="true"/>
  </div>
</template>

<script>
import MExpand from '../../packages/m-expand/m-expand'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCaretRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretDown, faCaretRight, faSpinner)

export default {
  name: 'mExpandTest',
  components: {MExpand, FontAwesomeIcon}
}
</script>
