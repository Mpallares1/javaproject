test calculadora

import { mount } from '@vue/test-utils';
import Calculator from '../src/views/Calculadora.vue';
import { flushPromises } from '@vue/test-utils';
import { beforeEach, describe, it, expect } from 'vitest';  // Asegúrate de que estas importaciones estén presentes
import { beforeEach, describe, it, expect } from 'vitest';


describe('Calculadora.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Calculator);
    });

    it('debería mostrar correctamente los números en la pantalla', async () => {
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await wrapper.findAll('button').at(2).trigger('click'); // botón 2
        await flushPromises();
        expect(wrapper.text()).toContain('12');
    });

    it('debería realizar una suma correctamente', async () => {
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await wrapper.findAll('button').at(11).trigger('click'); // botón +
        await wrapper.findAll('button').at(2).trigger('click'); // botón 2
        await wrapper.find('button:last-child').trigger('click'); // botón =
        await flushPromises();
        expect(wrapper.text()).toContain('3');
    });

    it('debería manejar ceros iniciales correctamente', async () => {
        await wrapper.findAll('button').at(9).trigger('click'); // botón 0
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await flushPromises();
        expect(wrapper.text()).toContain('1');
    });

    it('debería manejar múltiples operadores sin errores', async () => {
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await wrapper.findAll('button').at(11).trigger('click'); // botón +
        await wrapper.findAll('button').at(11).trigger('click'); // botón + (duplicado)
        await wrapper.findAll('button').at(2).trigger('click'); // botón 2
        await wrapper.find('button:last-child').trigger('click'); // botón =
        await flushPromises();
        expect(wrapper.text()).toContain('3');
    });

    it('debería manejar los errores de cálculo', async () => {
        wrapper.setData({ display: '1/0' });
        await wrapper.find('button:last-child').trigger('click'); // botón =
        await flushPromises();
        expect(wrapper.text()).toContain('Error');
    });

    it('debería realizar una resta correctamente', async () => {
        await wrapper.findAll('button').at(3).trigger('click'); // botón 3
        await wrapper.findAll('button').at(12).trigger('click'); // botón -
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await wrapper.find('button:last-child').trigger('click'); // botón =
        await flushPromises();
        expect(wrapper.text()).toContain('2');
    });

    it('debería realizar una multiplicación correctamente', async () => {
        await wrapper.findAll('button').at(2).trigger('click'); // botón 2
        await wrapper.findAll('button').at(13).trigger('click'); // botón *
        await wrapper.findAll('button').at(3).trigger('click'); // botón 3
        await wrapper.find('button:last-child').trigger('click'); // botón =
        await flushPromises();
        expect(wrapper.text()).toContain('6');
    });

    it('debería realizar una división correctamente', async () => {
        await wrapper.findAll('button').at(6).trigger('click'); // botón 6
        await wrapper.findAll('button').at(14).trigger('click'); // botón /
        await wrapper.findAll('button').at(2).trigger('click'); // botón 2
        await wrapper.find('button:last-child').trigger('click'); // botón =
        await flushPromises();
        expect(wrapper.text()).toContain('3');
    });

    it('debería manejar la entrada de decimales correctamente', async () => {
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await wrapper.findAll('button').at(10).trigger('click'); // botón .
        await wrapper.findAll('button').at(2).trigger('click'); // botón 2
        await flushPromises();
        expect(wrapper.text()).toContain('1.2');
    });

    it('debería manejar la entrada de números negativos correctamente', async () => {
        await wrapper.findAll('button').at(12).trigger('click'); // botón -
        await wrapper.findAll('button').at(1).trigger('click'); // botón 1
        await flushPromises();
        expect(wrapper.text()).toContain('-1');
    });
});