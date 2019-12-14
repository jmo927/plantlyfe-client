import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
    const wrapper = mount(Home);
    const bWO = wrapper.vm.buildWeekOne();

    test('buildWeekOne should return an array', () => {
        expect(Array.isArray(bWO)).toBe(true);
    });

    test('buildAnotherWeek loop should result in array of 12 week arrays', () => {
        const arr = wrapper.vm.weeks;
        expect(arr.length).toBe(12);
    })

});
