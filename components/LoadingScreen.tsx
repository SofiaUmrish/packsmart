interface LoadingScreenProps {
    message: string;
}
export default function LoadingScreen({ message }: LoadingScreenProps){
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[400px] p-8 bg-white rounded-2xl border border-charcoal/10 shadow-sm max-w-3xl mx-auto my-12 gap-4">
            <div className="w-10 h-10 border-4 border-sage/20 border-t-sage rounded-full animate-spin"></div>
            
            <p className="text-charcoal font-medium text-lg animate-pulse">{message}</p>
        </div>
    );
}