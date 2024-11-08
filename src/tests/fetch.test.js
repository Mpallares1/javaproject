
import { mount } from '@vue/test-utils'
import Comments from '../src/views/ComentariFetch.vue'
import { vi, describe, it, expect } from 'vitest'

// Simula la función fetch global
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{
            id: 1, name: 'Test Comment', body: 'This is a comment'
        }])
    })
)

describe('fetch', () => {
    it('fetches comments from API', async () => {
        // Monta el componente
        const wrapper = mount(Comments)

        // Espera a que las promesas se resuelvan, incluyendo la llamada fetch
        await wrapper.vm.$nextTick() // Espera a que Vue termine de procesar el ciclo de reactividad
        await new Promise(resolve => setTimeout(resolve, 100)) // Espera un poco más por si fetch tarda

        // Verifica que se hayan cargado los comentarios y que haya al menos uno
        expect(wrapper.vm.comments.length).toBeGreaterThan(0)

        // Verifica si el contenido del comentario es el esperado
        const commentItem = wrapper.find('li')
        expect(commentItem.text()).toContain('Test Comment')
        expect(commentItem.text()).toContain('This is a comment')
    })
})