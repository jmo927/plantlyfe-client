import { mount, shallowMount } from '@vue/test-utils';
import WeekView from '@/components/WeekView.vue';

describe('WeekView.vue', () => {
    const sun = new Date('Sun Dec 08 2019');
    const mon = new Date('Mon Dec 09 2019');
    const tue = new Date('Tue Dec 10 2019');
    const wed = new Date('Wed Dec 11 2019');
    const thu = new Date('Thu Dec 12 2019');
    const fri = new Date('Fri Dec 13 2019');
    const sat = new Date('Sat Dec 14 2019');

    const temp = {
        weekInfo: [ sun, mon, tue, wed, thu, fri, sat ],
        weekCount: 0
    }
    const title = 'Week ' + (temp.weekCount + 1)
    const wrapper = shallowMount(WeekView, {
        propsData: temp
    })

    it('renders props.temp when passed', () => {
        expect(wrapper.find('.week-start').text()).toMatch(temp.weekInfo[0].toDateString());
        expect(wrapper.find('.week-end').text()).toMatch(temp.weekInfo[6].toDateString());
        expect(wrapper.find('.week-title').text()).toMatch(title);
    })

})
