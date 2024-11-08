import { mount } from '@vue/test-utils';
import Calculadora from '../views/Calculadora.vue';
import { describe, it, expect } from 'vitest';

describe('Calculadora.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(Calculadora);
        expect(wrapper.vm.currentValue).toBe('');
    });

    it('appends numbers correctly', () => {
        const wrapper = mount(Calculadora);
        wrapper.vm.append('1');
        expect(wrapper.vm.currentValue).toBe('1');
    });

    it('adds numbers correctly', () => {
        const wrapper = mount(Calculadora);
        wrapper.vm.append('1');
        wrapper.vm.setPreviousValue();
        wrapper.vm.add();
        wrapper.vm.append('1');
        wrapper.vm.equal();
        expect(wrapper.vm.currentValue).toBe('2');
    });
});
