import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import emailjs from '@emailjs/browser';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should simulate email send when EmailJS is not configured', async () => {
    service.setConfig({
      serviceId: 'YOUR_SERVICE_ID',
      templateId: 'YOUR_TEMPLATE_ID',
      publicKey: 'YOUR_PUBLIC_KEY'
    });

    const result = await service.sendContactMessage({
      name: 'Mario Rossi',
      email: 'mario@example.com',
      phone: '3331234567',
      message: 'Vorrei un preventivo'
    });

    expect(result.success).toBe(true);
    expect(result.simulated).toBe(true);
  });

  it('should call emailjs.send when EmailJS is configured', async () => {
    service.setConfig({
      serviceId: 'service_abc123',
      templateId: 'template_xyz789',
      publicKey: 'public_key_valid123'
    });

    const sendSpy = vi.spyOn(emailjs, 'send').mockResolvedValue({
      status: 200,
      text: 'OK'
    } as any);

    const result = await service.sendContactMessage({
      name: 'Luigi Bianchi',
      email: 'luigi@example.com',
      phone: '3890000000',
      message: 'Richiesta posa parquet'
    });

    expect(sendSpy).toHaveBeenCalledWith(
      'service_abc123',
      'template_xyz789',
      expect.objectContaining({
        user_name: 'Luigi Bianchi',
        user_email: 'luigi@example.com',
        user_phone: '3890000000',
        message: 'Richiesta posa parquet'
      }),
      { publicKey: 'public_key_valid123' }
    );
    expect(result.success).toBe(true);
  });

  it('should throw an error when emailjs.send fails', async () => {
    service.setConfig({
      serviceId: 'service_abc123',
      templateId: 'template_xyz789',
      publicKey: 'public_key_valid123'
    });

    vi.spyOn(emailjs, 'send').mockResolvedValue({
      status: 400,
      text: 'Bad Request'
    } as any);

    await expect(
      service.sendContactMessage({
        name: 'Test Error',
        email: 'test@example.com',
        phone: '12345',
        message: 'Test'
      })
    ).rejects.toThrow('EmailJS ha restituito lo stato 400');
  });
});
