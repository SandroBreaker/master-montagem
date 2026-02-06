
import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  defaultImageUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, defaultImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validações básicas
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('A imagem deve ter no máximo 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Gerar nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      // Upload para o Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Obter URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadSuccess(publicUrl);
    } catch (err: any) {
      console.error('Erro no upload:', err);
      setError('Falha ao processar o upload. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div 
        className={`relative h-64 rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center gap-4 ${
          preview ? 'border-amber-500/50 bg-slate-950' : 'border-white/10 bg-slate-950/50 hover:border-amber-500/30'
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={removeImage}
                className="bg-red-500 text-white p-3 rounded-2xl hover:bg-red-600 transition-colors shadow-xl"
              >
                <X size={24} />
              </button>
            </div>
          </>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer flex flex-col items-center gap-4 p-8 text-center group"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-500">
              {isUploading ? (
                <Loader2 size={32} className="text-amber-500 animate-spin group-hover:text-slate-950" />
              ) : (
                <Upload size={32} className="text-slate-500 group-hover:text-slate-950" />
              )}
            </div>
            <div>
              <p className="text-white font-black uppercase text-xs tracking-widest mb-1">
                {isUploading ? 'Enviando Arquivo...' : 'Carregar Foto do Projeto'}
              </p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">PNG, JPG ou WEBP até 5MB</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-[10px] font-black uppercase text-center">{error}</p>
      )}

      {preview && !isUploading && (
        <div className="flex items-center justify-center gap-2 text-green-400">
          <CheckCircle2 size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Upload Concluído com Sucesso</span>
        </div>
      )}

      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
