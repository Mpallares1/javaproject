import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Comentaris from '../views/Comentaris.vue'; // Replace with the actual path to your Comentaris
import { nextTick } from 'vue';

// Mock the fetch API for testing
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(
            Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                name: `Commenter ${i + 1}`,
                email: `email${i + 1}@example.com`,
                body: `This is comment ${i + 1}`
            }))
        ),
    })
);

describe('Comentaris.vue', () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = mount(Comentaris);
        await nextTick();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the header with navigation items', () => {
        expect(wrapper.find('header h1').text()).toBe('Marc');
        const navItems = wrapper.findAll('nav ul li');
        expect(navItems.length).toBe(3);
        expect(navItems[0].text()).toBe('Inici');
        expect(navItems[1].text()).toBe('Calculadora');
        expect(navItems[2].text()).toBe('Usuaris');
    });

    it('displays loading indicator before comments load', async () => {
        wrapper = mount(Comentaris); // Re-mount to simulate initial loading
        expect(wrapper.find('.loading').exists()).toBe(true);
        expect(wrapper.find('.loading').text()).toBe('Carregant comentaris...');
    });

    it('renders comments list after loading', async () => {
        await nextTick();
        expect(wrapper.find('.loading').exists()).toBe(false); // Loading indicator should disappear
        const comments = wrapper.findAll('.comment');
        expect(comments.length).toBe(10); // Only the initial 10 comments should be visible
        expect(comments[0].find('h3').text()).toBe('Commenter 1');
    });

    it('loads more comments when "Carregar més" button is clicked', async () => {
        await nextTick();
        await wrapper.find('button').trigger('click');
        await nextTick();
        const comments = wrapper.findAll('.comment');
        expect(comments.length).toBe(20); // All 20 comments should now be visible
    });

    it('shows "Carregar més" button only when there are more comments to load', async () => {
        await nextTick();
        expect(wrapper.find('button').exists()).toBe(true); // Initially, the button is visible
        await wrapper.find('button').trigger('click'); // Load all comments
        await nextTick();
        expect(wrapper.find('button').exists()).toBe(false); // Button disappears once all comments are loaded
    });
});
