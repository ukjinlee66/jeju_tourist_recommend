import os
import argparse


def parse_args(mode='train'):
    parser = argparse.ArgumentParser()

    
    parser.add_argument('--seed', default=42, type=int, help='seed')
    
    parser.add_argument('--device', default='cpu', type=str, help='cpu or gpu')
    
    parser.add_argument('--model_dir', default='models/', type=str, help='model directory')
    parser.add_argument('--model_name', default='sentiment_model.pt', type=str, help='model file name')
    
    parser.add_argument('--max_len', default=64, type=int, help='max length')
    parser.add_argument('--num_workers', default=1, type=int, help='number of workers')

    parser.add_argument('--hidden_dim', default=768, type=int, help='hidden dimension size')
    parser.add_argument('--num_classes', default=9, type=int, help='num_classes')
    
    parser.add_argument('--num_epochs', default=10, type=int, help='number of epochs')
    parser.add_argument('--max_grad_norm', default=1, type=int, help='maximunm grad norm')
    parser.add_argument('--batch_size', default=64, type=int, help='batch size')
    parser.add_argument('--learning_rate', default=5e-5, type=float, help='learning rate')
    parser.add_argument('--warmup_ratio', default=0.1, type=float, help='warm up ratio')

    parser.add_argument('--log_interval', default=200, type=int, help='log interval')
    parser.add_argument('--model', default='bert', type=str, help='model type')
    parser.add_argument('--optimizer', default='adam', type=str, help='optimizer type')
    
    args = parser.parse_args()

    return args
