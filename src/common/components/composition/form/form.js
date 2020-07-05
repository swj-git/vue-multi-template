import { reactive, toRefs } from '@vue/composition-api';

function useForm() {
  const state = reactive({
    formValues: {}
  });

  const updateFormValues = function(formValues) {
    state.formValues = formValues;
  };

  return {
    ...toRefs(state),
    updateFormValues
  };
}

export { useForm };
