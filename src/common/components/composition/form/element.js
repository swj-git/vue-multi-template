import { ref, watch } from '@vue/composition-api';
import { isEqual } from 'lodash';
import { useRequired } from './required';

function useFormElement(props, context, options = {}) {
  const { requiredKey = 'required' } = options;
  const rules = ref('');
  const dirty = ref(false);
  const localValue = ref(null);
  const initialValue = ref(null);
  const { isRequired } = useRequired(rules, requiredKey);

  const setInitialValue = function(value) {
    initialValue.value = localValue.value = value;
  };

  const updateLocalValue = function(value) {
    dirty.value = true;
    localValue.value = value;
    context.emit('input', value);
  };

  const watchPropValue = function(callback) {
    watch(
      () => props.value,
      value => {
        if (isEqual(value, localValue.value)) {
          return;
        }

        callback(value);
      },
      {
        deep: true
      }
    );
  };

  watchPropValue(value => {
    if (!dirty.value) {
      initialValue.value = value;
    }

    localValue.value = value;
  });

  watch(
    () => props.rules,
    value => {
      rules.value = value;
    }
  );

  return {
    dirty,
    isRequired,
    watchPropValue,
    localValue,
    setInitialValue,
    updateLocalValue
  };
}

export { useFormElement };
