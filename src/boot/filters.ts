import { boot } from 'quasar/wrappers';
import { districts as districtsUb, provinces as provincesUb } from 'boot/ubigeo';
import type { SelectOption } from 'src/types/select-option';

function ubigeoFilterDistrict(value: string | null) {
  const result: SelectOption[] = [];
  const districts = districtsUb;
  Object.keys(districts).forEach((key) => {
    const district = key.substring(0, 4);
    if (district === value) {
      result.push({
        name: districts[key]!,
        id: key,
      });
    }
  });
  return result;
}

function ubigeoFilterProvince(value: string | null) {
  const result: SelectOption[] = [];
  const provinces = provincesUb;
  Object.keys(provinces).forEach((key) => {
    const department = key.substring(0, 2);
    if (department == value) {
      result.push({
        name: provinces[key]!,
        id: key,
      });
    }
  });
  return result;
}

export { ubigeoFilterDistrict, ubigeoFilterProvince };

export default boot(({ app }) => {
  app.config.globalProperties.$filters = {
    ubigeoFilterDistrict,
    ubigeoFilterProvince,
  };
});
