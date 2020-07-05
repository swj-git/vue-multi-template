import { isString } from 'lodash';
import { ref, watch } from '@vue/composition-api';

function useRequired(rules = ref(''), requiredKey = 'required') {
  const isRequired = ref(false);

  watch(
    rules,
    (rules = '') => {
      isRequired.value = false;
      requiredKey = isString(requiredKey)
        ? requiredKey.split('|')
        : requiredKey;

      if (isString(rules)) {
        rules.split('|').forEach(rule => {
          const [ruleName] = rule.split(':');

          if (requiredKey.includes(ruleName)) {
            isRequired.value = true;
          }
        });
      } else {
        requiredKey.forEach(key => {
          if (rules[key]) {
            isRequired.value = true;
          }
        });
      }
    },
    {
      deep: true
    }
  );

  return { isRequired };
}

export { useRequired };
