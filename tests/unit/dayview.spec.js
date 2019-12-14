import { shallowMount } from '@vue/test-utils'
import DayView from '@/components/DayView.vue'

describe('DayView.vue', () => {

  test('Should receive and render props', () => {
    const date = new Date();
    const weekday = date.getDay();
    const weekdayStr = date.toDateString().slice(0, 3);

    const wrapper = shallowMount(DayView, {
      propsData: { date, weekday }
    });

    expect(wrapper.find('.wd').text()).toMatch(weekday.toString());
    expect(wrapper.find('.day-name').text()).toMatch(weekdayStr);
  });

})
