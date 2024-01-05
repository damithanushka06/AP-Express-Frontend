/**
 * Converts an object to FormData for sending multipart/form-data requests.
 * @param obj The object to convert.
 * @returns The FormData object.
 */
export function ConvertObjToFormData(obj: any): FormData {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    if (key === 'files') {
      // Handle files array as individual parts
      for (let i = 0; i < obj[key].length; i++) {
        if (obj[key][i] !== null) {
          formData.append(`files[${i}]`, obj[key][i]);
        }
      }
    } else if (Array.isArray(obj[key])) {
      // Handle nested arrays recursively
      handleNestedArray(formData, obj[key], key);
    } else {
      // Append other properties to FormData
      if (obj[key] !== null) {
        formData.append(key, obj[key]);
      }
    }
  });
  return formData;
}

/**
 * Handles nested arrays in the object recursively.
 * @param formData The FormData object.
 * @param array The nested array to handle.
 * @param prefix The prefix for the nested array in the FormData keys.
 */
function handleNestedArray(formData: FormData, array: any[], prefix: string) {
  array.forEach((item, index) => {
    Object.keys(item).forEach(key => {
      const nestedKey = `${prefix}[${index}].${key}`;
      if (item[key] instanceof FileList) {
        // Handle FileList in nested arrays as individual parts
        for (let i = 0; i < item[key].length; i++) {
          if (item[key][i] !== null) {
            formData.append(`${nestedKey}[${i}]`, item[key][i]);
          }
        }
      } else {
        // Append other properties in nested arrays to FormData
        if (item[key] !== null) {
          formData.append(nestedKey, item[key]);
        }
      }
    });
  });
}
