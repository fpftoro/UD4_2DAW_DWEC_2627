import { describe, it, expect } from 'vitest';
import { generarContrasena, crearAleatorioConSemilla } from '../src/contrasenas.js';

describe('generarContrasena', () => {
  it('tiene 12 caracteres por defecto', () => {
    expect(generarContrasena({}, crearAleatorioConSemilla(1))).toHaveLength(12);
  });

  // TODO: añade el resto de tests del enunciado
});
