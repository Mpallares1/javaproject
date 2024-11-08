import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import Usuaris from '../views/Usuaris.vue';



vi.mock('axios');

describe('axios', () => {

    it('intenta fer una peticio amb dos elements amb el nom de raul i marcs', async () => {
        // Mock de respuesta de axios
        const mockUsers = [
            {
                id: 1,
                firstName: "raul",
                lastName: "patrascu",
                age: 28,
                gender: "female",
                email: "emily.johnson@x.dummyjson.com",
                company: {
                name: "Dooley, Kozey and Cronin"
            }
            },
        ];

        axios.get.mockResolvedValueOnce({ data: { users: mockUsers } });

        const wrapper = mount(Usuaris);

        await wrapper.vm.$nextTick();

        await new Promise(resolve => setTimeout(resolve, 100));

        const postTitles = wrapper.findAll('h3');

        expect(postTitles.length).toBe(1);

        expect(postTitles[0].text()).toContain('raul');
    });
});